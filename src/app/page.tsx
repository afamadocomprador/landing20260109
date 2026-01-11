"use client";

import React, { useState } from 'react';
import {
  Search, Menu, X, CheckCircle2, Phone,
  MapPin, MessageSquare, Send, Calculator
} from 'lucide-react';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import PlanComparison from '@/components/ui/PlanComparison';

export default function DKVLandingPage() {
  // Estados para controlar los Overlays
  const [activeOverlay, setActiveOverlay] = useState<null | 'tratamientos' | 'dentistas' | 'contacto' | 'exito'>(null);

  const closeOverlay = () => setActiveOverlay(null);

  return (
    <div className="min-h-screen bg-[#f8f8f5] font-sans">
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-black text-[#859900] text-3xl tracking-tighter">DKV</span>
            <span className="text-[#6A625A] text-xs self-end mb-1">Dental</span>
          </div>
          <button className="p-2 text-[#859900]">
            <Menu size={32} />
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80"
            className="w-full h-full object-cover"
            alt="DKV Dental"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#033B37]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Tu sonrisa,<br />nuestra especialidad.
          </h1>
          <p className="text-xl mb-8 max-w-xl text-gray-200">
            Descubre el seguro dental líder con la red de clínicas más amplia de España.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveOverlay('tratamientos')}
              className="bg-[#859900] hover:bg-[#6a7a00] text-white px-8 py-4 rounded font-bold transition-all"
            >
              Buscar Tratamientos
            </button>
            <button
              onClick={() => setActiveOverlay('dentistas')}
              className="bg-white text-[#033B37] px-8 py-4 rounded font-bold hover:bg-gray-100 transition-all"
            >
              Ver Clínicas
            </button>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN DE CONTACTO RÁPIDO --- */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#033B37] mb-4">¿Tienes dudas?</h2>
          <p className="text-[#6A625A] mb-8">Consúltanos cualquier detalle sobre nuestras coberturas sin compromiso.</p>
          <button
            onClick={() => setActiveOverlay('contacto')}
            className="inline-flex items-center gap-2 text-[#ED0039] font-bold text-lg hover:underline"
          >
            <MessageSquare /> Enviar consulta ahora
          </button>
        </div>
      </section>

      {/* --- SECCIÓN DE PREGUNTAS FRECUENTES (FAQ) --- */}
      <section className="py-20 bg-[#F7F7F7]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#033B37] mb-4">Preguntas Frecuentes</h2>
            <p className="text-[#6A625A]">
              Resolvemos las dudas más comunes sobre nuestro seguro dental.
            </p>
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* --- SECCIÓN DE COMPARATIVA DE PLANES --- */}
      <PlanComparison />

      {/* --- OVERLAYS --- */}

      {/* 1. Buscador de Tratamientos */}
      {activeOverlay === 'tratamientos' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b flex justify-between items-center bg-[#859900] text-white">
              <h3 className="text-xl font-bold">Buscador de Tratamientos</h3>
              <button onClick={closeOverlay}><X /></button>
            </div>
            <div className="p-8">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ej: Limpieza dental, Ortodoncia..."
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#859900] outline-none"
                />
              </div>
              <div className="mt-6 space-y-2">
                <p className="text-sm font-bold text-gray-400 uppercase">Sugeridos</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {['Revisiones', 'Radiografías', 'Higiene Bucal'].map(t => (
                    <div key={t} className="p-3 border rounded hover:bg-gray-50 cursor-pointer flex justify-between">
                      <span>{t}</span>
                      <span className="text-[#859900] font-bold">Gratis</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Buscador de Dentistas */}
      {activeOverlay === 'dentistas' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b flex justify-between items-center bg-[#033B37] text-white">
              <h3 className="text-xl font-bold">Clínicas Cercanas</h3>
              <button onClick={closeOverlay}><X /></button>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-[#033B37]">Clínica DKV Dental {i === 1 ? 'Pozuelo' : 'Madrid Centro'}</h4>
                    <p className="text-sm text-gray-500">Calle Mayor, {i * 10}, Madrid</p>
                  </div>
                  <button className="text-[#859900] font-bold">Llamar</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Formulario de Contacto */}
      {activeOverlay === 'contacto' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#f8f5f6] w-full max-w-md rounded-xl overflow-hidden shadow-2xl">
            <div className="p-6 flex justify-between items-center bg-[#ED0039] text-white">
              <h3 className="text-xl font-bold uppercase tracking-widest">Contacto DKV</h3>
              <button onClick={closeOverlay}><X /></button>
            </div>
            <form className="p-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setActiveOverlay('exito'); }}>
              <input type="text" placeholder="Nombre completo" className="w-full p-4 border rounded focus:border-[#033B37] outline-none" required />
              <input type="tel" placeholder="Teléfono" className="w-full p-4 border rounded focus:border-[#033B37] outline-none" required />
              <textarea placeholder="¿En qué podemos ayudarte?" className="w-full p-4 border rounded h-32 outline-none" required></textarea>
              <button className="w-full bg-[#ED0039] text-white font-bold py-4 rounded hover:bg-[#892737] transition-all">
                ENVIAR CONSULTA
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. Éxito al recibir */}
      {activeOverlay === 'exito' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-8 text-center shadow-2xl">
            <div className="flex justify-center mb-6 text-[#859900]">
              <CheckCircle2 size={80} />
            </div>
            <h3 className="text-2xl font-black text-[#859900] mb-4">¡Recibido!</h3>
            <p className="text-[#6A625A] mb-8">Un agente DKV se pondrá en contacto contigo en breve.</p>
            <button
              onClick={closeOverlay}
              className="w-full bg-[#859900] text-white font-bold py-3 rounded"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Floating WhatsApp */}
      <a href="#" className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-30">
        <Phone size={30} />
      </a>
    </div>
  );
}
