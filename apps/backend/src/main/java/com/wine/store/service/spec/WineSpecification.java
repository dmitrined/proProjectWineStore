package com.wine.store.service.spec;

import com.wine.store.dto.WineSearchRequest;
import com.wine.store.model.Wine;
import com.wine.store.model.WineFlavor;
import com.wine.store.model.WineType;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

/**
 * НАЗНАЧЕНИЕ: Динамическая фильтрация вин через JPA Specification.
 * ИСПОЛЬЗУЕТ: WineSearchRequest.
 */
public class WineSpecification {

    public static Specification<Wine> getSpec(WineSearchRequest request) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (request == null) {
                return cb.conjunction();
            }

            // 1. Поиск (Search) - LIKE по имени, описанию, сорту или тегам
            if (StringUtils.hasText(request.search())) {
                String pattern = "%" + request.search().toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), pattern),
                        cb.like(cb.lower(root.get("description")), pattern),
                        cb.like(cb.lower(root.get("grapeVariety")), pattern),
                        cb.like(cb.lower(root.join("tags", jakarta.persistence.criteria.JoinType.LEFT)), pattern)));
                query.distinct(true);
            }

            // 2. Категория / Тип
            String category = request.category() != null ? request.category() : request.type();
            if (StringUtils.hasText(category)) {
                try {
                    predicates.add(cb.equal(
                            root.get("type"),
                            WineType.valueOf(category.toUpperCase())));
                } catch (IllegalArgumentException ignored) {
                }
            }

            // 3. Сорт винограда
            if (StringUtils.hasText(request.grape())) {
                predicates.add(cb.equal(root.get("grapeVariety"), request.grape()));
            }

            // 4. Вкус (Flavor)
            if (StringUtils.hasText(request.flavor())) {
                try {
                    predicates.add(cb.equal(
                            root.get("flavor"),
                            WineFlavor.valueOf(request.flavor().toUpperCase())));
                } catch (IllegalArgumentException ignored) {
                }
            }

            // 5. Тег (Tag)
            if (StringUtils.hasText(request.tag())) {
                predicates.add(cb.isMember(request.tag(), root.get("tags")));
            }

            // 6. Качество (Quality)
            if (StringUtils.hasText(request.quality())) {
                String q = request.quality().toLowerCase();
                Predicate qualityMatch = cb.like(cb.lower(root.get("qualityLevel")), "%" + q + "%");
                Predicate editionMatch = cb.like(cb.lower(root.get("edition")), "%" + q + "%");
                predicates.add(cb.or(qualityMatch, editionMatch));
            }

            // 7. Диапазон цен
            if (request.minPrice() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), request.minPrice()));
            }
            if (request.maxPrice() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), request.maxPrice()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
