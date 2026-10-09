import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerroService, RespuestaPerros } from './perro.service';

@Component({
  selector: 'app-perros',
  imports: [CommonModule],
  templateUrl: './perros.html'
})
export class Perros implements OnInit {
  perros: string[] = [];
  cargando = true;
  error = '';

  constructor(
    private servicio: PerroService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarPerros();
  }

  cargarPerros(): void {
    this.cargando = true;
    this.error = '';
    this.servicio.obtenerPerros().subscribe({
      next: (respuesta: RespuestaPerros) => {
        this.perros = respuesta.message;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al consumir la API', err);
        this.error = 'No se pudieron cargar las imágenes.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}