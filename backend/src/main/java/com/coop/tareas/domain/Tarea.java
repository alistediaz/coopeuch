package com.coop.tareas.domain;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "\"tareas\"", schema = "COOP")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tarea{

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", insertable = false, updatable = false)
    private Integer id;
	
	@Column(name = "descripcion", length = 100)
	private String descripcion;
	@Column(name = "fecha_creacion", insertable = false)
	private Calendar fechaCreacion;
	@Column(name = "vigente")
	private boolean vigente;
	
}
