package com.wine.store.service;

import com.wine.store.dto.WineSearchRequest;
import com.wine.store.model.Wine;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * НАЗНАЧЕНИЕ: Построитель динамических SQL-запросов для фильтрации вин.
 * ЗАВИСИМОСТИ: JPA Criteria API, WineSearchRequest.
 */
public class WineSpecification {

    public static Specification<Wine> getSpec(WineSearchRequest request) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 1. Поиск (Search) - LIKE по имени, описанию, сорту или тегам
            if (StringUtils.hasText(request.search())) {
                String pattern = "%" + request.search().toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), pattern),
                        cb.like(cb.lower(root.get("description")), pattern),
                        cb.like(cb.lower(root.get("grapeVariety")), pattern),
                        // Search in tags as well
                        cb.like(cb.lower(root.join("tags", jakarta.persistence.criteria.JoinType.LEFT)), pattern)));
                query.distinct(true);
            }

            // 2. Категория / Тип (Exact Match)
            // Frontend sends 'category' or 'type'.
            if (StringUtils.hasText(request.category())) {
                predicates.add(cb.equal(cb.lower(root.get("type")), request.category().toLowerCase()));
            } else if (StringUtils.hasText(request.type())) {
                predicates.add(cb.equal(cb.lower(root.get("type")), request.type().toLowerCase()));
            }

            // 3. Сорт винограда (Exact Match)
            if (StringUtils.hasText(request.grape())) {
                // Ignore case just to be safe
                predicates.add(cb.equal(cb.lower(root.get("grapeVariety")), request.grape().toLowerCase()));
            }

            // 4. Вкус (Flavor)
            if (StringUtils.hasText(request.flavor())) {
                predicates.add(cb.equal(cb.lower(root.get("flavor")), request.flavor().toLowerCase()));
            }

            // 5. Тег (Tag) - MEMBER OF logic for List<String>
            if (StringUtils.hasText(request.tag())) {
                predicates.add(cb.isMember(request.tag(), root.get("tags")));
            }

            // 6. Качество (Quality) - Contains logic for 'literweine' or 'edition'
            if (StringUtils.hasText(request.quality())) {
                String q = request.quality().toLowerCase();
                boolean isEdition = q.contains("edition");

                // Logic mimics frontend: check qualityLevel or edition fields
                Predicate qualityMatch = cb.like(cb.lower(root.get("qualityLevel")), "%" + q + "%");
                Predicate editionMatch = cb.like(cb.lower(root.get("edition")), "%" + q + "%");

                if (q.equals("literweine")) {
                    predicates.add(cb.like(cb.lower(root.get("qualityLevel")), "%liter%"));
                } else if (isEdition) {
                    // Extract letter if needed, or just partial match
                    // Simplified: just match string in either field
                    predicates.add(cb.or(qualityMatch, editionMatch));
                } else {
                    predicates.add(cb.or(qualityMatch, editionMatch));
                }
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
