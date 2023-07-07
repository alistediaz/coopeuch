package com.coop.tareas.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import com.coop.tareas.domain.Tarea;


public interface TareaRepository extends JpaRepository<Tarea, Integer> {}