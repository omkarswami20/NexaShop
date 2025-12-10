package com.nexashop.backend.service;

import com.nexashop.backend.dto.AuthDtos;
import com.nexashop.backend.entity.Customer;
import com.nexashop.backend.entity.RefreshToken;
import com.nexashop.backend.exception.ResourceNotFoundException;
import com.nexashop.backend.repository.CustomerRepository;
import com.nexashop.backend.repository.AddressRepository;
import com.nexashop.backend.security.JwtUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomerService {

        private final CustomerRepository customerRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtUtils jwtUtils;
        private final RefreshTokenService refreshTokenService;
        private final AddressRepository addressRepository;
        private final EmailService emailService;

        public CustomerService(CustomerRepository customerRepository,
                        PasswordEncoder passwordEncoder,
                        JwtUtils jwtUtils,
                        RefreshTokenService refreshTokenService,
                        AddressRepository addressRepository,
                        EmailService emailService) {
                this.customerRepository = customerRepository;
                this.passwordEncoder = passwordEncoder;
                this.jwtUtils = jwtUtils;
                this.refreshTokenService = refreshTokenService;
                this.addressRepository = addressRepository;
                this.emailService = emailService;
        }

        @Transactional
        public Customer registerCustomer(AuthDtos.CustomerRegisterRequest request) {
                if (customerRepository.existsByEmail(request.email())) {
                        throw new IllegalArgumentException("Email already exists");
                }
                if (customerRepository.existsByUsername(request.username())) {
                        throw new IllegalArgumentException("Username already exists");
                }
                // Phone check removed as it is optional/removed from registration

                Customer customer = new Customer(
                                request.name(),
                                request.username(),
                                request.email(),
                                passwordEncoder.encode(request.password()));

                customer.setEmailVerificationToken(java.util.UUID.randomUUID().toString());
                customer.setEmailVerified(false);

                Customer savedCustomer = customerRepository.save(customer);

                emailService.sendCustomerVerificationEmail(savedCustomer);

                return savedCustomer;
        }

        @Transactional
        public void verifyEmail(String token) {
                Customer customer = customerRepository.findByEmailVerificationToken(token)
                                .orElseThrow(() -> new IllegalArgumentException("Invalid verification token"));

                customer.setEmailVerified(true);
                customer.setEmailVerificationToken(null);
                customerRepository.save(customer);
        }

        public AuthDtos.LoginResponse loginCustomer(AuthDtos.LoginRequest request) {
                String identifier = request.identifier();
                Customer customer = customerRepository.findByEmail(identifier)
                                .or(() -> customerRepository.findByUsername(identifier))
                                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

                if (!passwordEncoder.matches(request.password(), customer.getPassword())) {
                        throw new IllegalArgumentException("Invalid credentials");
                }

                String token = jwtUtils.generateToken(customer.getEmail(), "ROLE_CUSTOMER");
                RefreshToken refreshToken = refreshTokenService.createRefreshToken(customer.getEmail());

                return new AuthDtos.LoginResponse(
                                token,
                                refreshToken.getToken(),
                                customer.getId(),
                                customer.getName(),
                                customer.getEmail(),
                                "CUSTOMER",
                                customer.isEmailVerified(),
                                "ACTIVE");
        }

        @Transactional
        public void resetPassword(String identifier, String newPassword) {
                Customer customer = customerRepository.findByEmail(identifier)
                                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

                customer.setPassword(passwordEncoder.encode(newPassword));
                customerRepository.save(customer);
        }

        // Profile Management

        public com.nexashop.backend.dto.CustomerDtos.ProfileResponse getProfile(String email) {
                Customer customer = customerRepository.findByEmail(email)
                                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
                return new com.nexashop.backend.dto.CustomerDtos.ProfileResponse(
                                customer.getId(),
                                customer.getName(),
                                customer.getUsername(),
                                customer.getEmail(),
                                customer.isEmailVerified());
        }

        @Transactional
        public com.nexashop.backend.dto.CustomerDtos.ProfileResponse updateProfile(String email,
                        com.nexashop.backend.dto.CustomerDtos.UpdateProfileRequest request) {
                Customer customer = customerRepository.findByEmail(email)
                                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

                customer.setName(request.name());
                // Email and Username usually not changeable easily or require re-verification

                Customer updatedCustomer = customerRepository.save(customer);
                return new com.nexashop.backend.dto.CustomerDtos.ProfileResponse(
                                updatedCustomer.getId(),
                                updatedCustomer.getName(),
                                updatedCustomer.getUsername(),
                                updatedCustomer.getEmail(),
                                updatedCustomer.isEmailVerified());
        }

        // Address Management

        public java.util.List<com.nexashop.backend.dto.CustomerDtos.AddressDto> getAddresses(String email) {
                Customer customer = customerRepository.findByEmail(email)
                                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

                return customer.getAddresses().stream()
                                .map(this::mapToAddressDto)
                                .collect(java.util.stream.Collectors.toList());
        }

        @Transactional
        public com.nexashop.backend.dto.CustomerDtos.AddressDto addAddress(String email,
                        com.nexashop.backend.dto.CustomerDtos.AddressDto request) {
                Customer customer = customerRepository.findByEmail(email)
                                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

                com.nexashop.backend.entity.Address address = new com.nexashop.backend.entity.Address();
                address.setStreet(request.street());
                address.setCity(request.city());
                address.setState(request.state());
                address.setZipCode(request.zipCode());
                address.setCountry(request.country());
                address.setType(com.nexashop.backend.entity.Address.AddressType.valueOf(request.type()));
                address.setCustomer(customer);

                com.nexashop.backend.entity.Address savedAddress = addressRepository.save(address);
                return mapToAddressDto(savedAddress);
        }

        @Transactional
        public com.nexashop.backend.dto.CustomerDtos.AddressDto updateAddress(String email, Long addressId,
                        com.nexashop.backend.dto.CustomerDtos.AddressDto request) {
                Customer customer = customerRepository.findByEmail(email)
                                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

                com.nexashop.backend.entity.Address address = addressRepository.findById(addressId)
                                .orElseThrow(() -> new ResourceNotFoundException("Address not found"));

                if (!address.getCustomer().getId().equals(customer.getId())) {
                        throw new IllegalArgumentException("Address does not belong to this customer");
                }

                address.setStreet(request.street());
                address.setCity(request.city());
                address.setState(request.state());
                address.setZipCode(request.zipCode());
                address.setCountry(request.country());
                address.setType(com.nexashop.backend.entity.Address.AddressType.valueOf(request.type()));

                com.nexashop.backend.entity.Address updatedAddress = addressRepository.save(address);
                return mapToAddressDto(updatedAddress);
        }

        @Transactional
        public void deleteAddress(String email, Long addressId) {
                Customer customer = customerRepository.findByEmail(email)
                                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

                com.nexashop.backend.entity.Address address = addressRepository.findById(addressId)
                                .orElseThrow(() -> new ResourceNotFoundException("Address not found"));

                if (!address.getCustomer().getId().equals(customer.getId())) {
                        throw new IllegalArgumentException("Address does not belong to this customer");
                }

                addressRepository.delete(address);
        }

        private com.nexashop.backend.dto.CustomerDtos.AddressDto mapToAddressDto(
                        com.nexashop.backend.entity.Address address) {
                return new com.nexashop.backend.dto.CustomerDtos.AddressDto(
                                address.getId(),
                                address.getStreet(),
                                address.getCity(),
                                address.getState(),
                                address.getZipCode(),
                                address.getCountry(),
                                address.getType().name());
        }
}
