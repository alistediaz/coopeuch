package com.coop.tareas.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.coop.tareas.domain.Tarea;
import com.coop.tareas.persistence.TareaRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@WebMvcTest(TareaController.class)
public class TareaControllerTest {
	@Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper mapper;
    
    @MockBean
    TareaRepository tareaRepository;
    
    Tarea t1 = new Tarea(1, "Tarea 1", null, true);
    Tarea t2 = new Tarea(2, "Tarea 2", null, true);
    Tarea t3 = new Tarea(3, "Tarea 3", null, true);
	    
    @Test
    public void getAllRecords_success() throws Exception {
        List<Tarea> tareas = new ArrayList<>(Arrays.asList(t1, t2, t3));
        
        Mockito.when(tareaRepository.findAll()).thenReturn(tareas);
        
        mockMvc.perform(MockMvcRequestBuilders
                .get("/tareas")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[1].descripcion", is("Tarea 2")));
    }
    
    @Test
    public void getTareaById_success() throws Exception {
        Mockito.when(tareaRepository.findById(t1.getId())).thenReturn(java.util.Optional.of(t1));

        mockMvc.perform(MockMvcRequestBuilders
                .get("/tareas/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.descripcion", is("Tarea 1")));
    }
    
    @Test
    public void createTarea_success() throws Exception {
	    Tarea tarea = Tarea.builder()
	            .descripcion("Tarea 1")
	            .fechaCreacion(null)
	            .vigente(true)
	            .build();
	
	    Mockito.when(tareaRepository.save(tarea)).thenReturn(tarea);
	
	    MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/tareas")
	            .contentType(MediaType.APPLICATION_JSON)
	            .accept(MediaType.APPLICATION_JSON)
	            .content(this.mapper.writeValueAsString(tarea));
	
	    mockMvc.perform(mockRequest)
	            .andExpect(status().isOk())
	            .andExpect(jsonPath("$", notNullValue()))
	            .andExpect(jsonPath("$.descripcion", is("Tarea 1")));
    }
    
    @Test
    public void updateTarea_success() throws Exception {
        Tarea updateTarea = Tarea.builder()
                .descripcion("Tarea 1")
	            .fechaCreacion(null)
	            .vigente(false)
                .build();

        Mockito.when(tareaRepository.findById(t1.getId())).thenReturn(Optional.of(t1));
        Mockito.when(tareaRepository.save(updateTarea)).thenReturn(updateTarea);

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/tareas")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(this.mapper.writeValueAsString(updateTarea));

        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.vigente", is(false)));
    }
    
    @Test
    public void updateTareaRecord_nullId() throws Exception {
        Tarea updatedTarea = Tarea.builder()
        		.id(null)
                .descripcion("Tarea 1")
	            .fechaCreacion(null)
	            .vigente(false)
                .build();

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.put("/tareas")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(this.mapper.writeValueAsString(updatedTarea));

        mockMvc.perform(mockRequest)
                .andExpect(status().isBadRequest())
                .andExpect(result ->
                    assertTrue(result.getResolvedException() instanceof InvalidRequestException))
        .andExpect(result ->
            assertEquals("La Tarea o el id de la tarea no deben ser nulos.", result.getResolvedException().getMessage()));
    }
    

	@Test
	public void updateTarea_tareaNotFound() throws Exception {
	    Tarea updatedTarea = Tarea.builder()
	    		.id(30)
                .descripcion("Tarea 30")
	            .fechaCreacion(null)
	            .vigente(false)
	            .build();
	    
	    Optional<Tarea> optionalRecord = tareaRepository.findById(updatedTarea.getId());
	    Mockito.when(tareaRepository.findById(updatedTarea.getId())).thenReturn(optionalRecord);
	
	    MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.put("/tareas")
	            .contentType(MediaType.APPLICATION_JSON)
	            .accept(MediaType.APPLICATION_JSON)
	            .content(this.mapper.writeValueAsString(updatedTarea));
	
	    mockMvc.perform(mockRequest)
	            .andExpect(status().isBadRequest())
	            .andExpect(result ->
	                assertTrue(result.getResolvedException() instanceof InvalidRequestException))
	            .andExpect(result ->
	            	assertEquals("La Tarea con id 30 no existe.", result.getResolvedException().getMessage()));
	}
	
	@Test
	public void deleteTareaById_success() throws Exception {
	    Mockito.when(tareaRepository.findById(t2.getId())).thenReturn(Optional.of(t2));

	    mockMvc.perform(MockMvcRequestBuilders
	            .delete("/tareas/2")
	            .contentType(MediaType.APPLICATION_JSON))
	            .andExpect(status().isOk());
	}

	@Test
	public void deleteTareaById_notFound() throws Exception {
	    Optional<Tarea> optionalRecord = tareaRepository.findById(30);

	    Mockito.when(tareaRepository.findById(30)).thenReturn(optionalRecord);

	    mockMvc.perform(MockMvcRequestBuilders
	            .delete("/tareas/30")
	            .contentType(MediaType.APPLICATION_JSON))
	    .andExpect(status().isBadRequest());
	}
}
