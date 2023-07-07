package com.coop.tareas.controller;

import java.util.List;
import java.util.Optional;

import javax.ws.rs.NotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coop.tareas.domain.Tarea;
import com.coop.tareas.persistence.TareaRepository;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping(value = "/tareas")
public class TareaController {
	@Autowired 
	private TareaRepository tareaRepository;
	
	@GetMapping
	public List<Tarea> getAllRecords() {
	    return tareaRepository.findAll();
	}

	@GetMapping(value = "{id}")
	public Tarea getTareaById(@PathVariable(value="id") Integer id) {
	    return tareaRepository.findById(id).get();
	}
	
	@PostMapping
	public Tarea createRecord(@RequestBody Tarea tarea) {
	    return tareaRepository.save(tarea);
	}
	
	@PutMapping
	public Tarea updateTarea(@RequestBody Tarea tarea) {
	    if (tarea == null || tarea.getId() == null) {
	        throw new InvalidRequestException("La Tarea o el id de la tarea no deben ser nulos.");
	    }
	    Optional<Tarea> optionalRecord = tareaRepository.findById(tarea.getId());
	    
	    if (optionalRecord.isEmpty()) {
	    	throw new InvalidRequestException("La Tarea con id " + tarea.getId() + " no existe.");
	    }
	    Tarea tareaExistente = optionalRecord.get();

	    tareaExistente.setDescripcion(tarea.getDescripcion());
	    tareaExistente.setVigente(tarea.isVigente());
		
	    return tareaRepository.save(tareaExistente);
	}
	
	@DeleteMapping(value = "{id}")
	public void deletePatientById(@PathVariable(value = "id") int id) throws NotFoundException {
	    if (tareaRepository.findById(id).isEmpty()) {
	    	throw new InvalidRequestException("La Tarea con id " + id + " no existe.");
	    }
	    tareaRepository.deleteById(id);
	}
}
