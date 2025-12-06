package com.nexashop.backend.controller;

import com.nexashop.backend.entity.Category;
import com.nexashop.backend.repository.CategoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/categories")
@SuppressWarnings("null")
public class CategoryController {

    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        // Return all categories. For a tree structure, frontend can process or we can
        // use findByParentIsNull
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    @GetMapping("/tree")
    public ResponseEntity<List<Category>> getCategoryTree() {
        return ResponseEntity.ok(categoryRepository.findByParentIsNull());
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Map<String, Object> payload) {
        String name = (String) payload.get("name");
        String description = (String) payload.get("description");
        Long parentId = payload.get("parentId") != null ? ((Number) payload.get("parentId")).longValue() : null;

        Category category = new Category(name, description);

        if (parentId != null) {
            categoryRepository.findById(parentId).ifPresent(category::setParent);
        }

        return ResponseEntity.ok(categoryRepository.save(category));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        return categoryRepository.findById(id).map(category -> {
            category.setName((String) payload.get("name"));
            category.setDescription((String) payload.get("description"));
            Long parentId = payload.get("parentId") != null ? ((Number) payload.get("parentId")).longValue() : null;

            if (parentId != null) {
                categoryRepository.findById(parentId).ifPresent(category::setParent);
            } else {
                category.setParent(null);
            }

            return ResponseEntity.ok(categoryRepository.save(category));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
