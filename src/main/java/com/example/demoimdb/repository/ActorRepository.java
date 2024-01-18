package com.example.demoimdb.repository;

import com.example.demoimdb.model.Actor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ActorRepository extends JpaRepository<Actor, Long> {
    @Query("select a from Actor a where :name is null or lower(a.name) like %:name%")
    Page<Actor> searchActor(String name, Pageable pageable);
}
