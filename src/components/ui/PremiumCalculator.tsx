"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { calculateAllFrequencies, Plan, Frequency } from '@/utils/pricing';
import { saveLead, LeadData } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { X, User, Baby } from "lucide-react";

const formSchema = z.object({
  nombre: z.string().min(2, "El nombre es obligatorio."),
  telefono: z.string().min(9, "El teléfono debe tener al menos 9 dígitos."),
  email: z.string().email("Introduce un email válido.").optional().or(z.literal('')),
});

interface PremiumCalculatorProps {
  initialPlan: Plan;
}

export function PremiumCalculator({ initialPlan }: PremiumCalculatorProps) {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<Plan>(initialPlan);
  const [selectedFrequency, setSelectedFrequency] = useState<Frequency | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      telefono: "",
      email: "",
    },
  });

  const handleAdultsChange = (amount: number) => {
    setAdults(prev => Math.max(1, prev + amount));
  };

  const handleChildrenChange = (amount: number) => {
    setChildren(prev => Math.max(0, prev + amount));
  };

  const results = calculateAllFrequencies({ adults, plan: selectedPlan });
  const selectedResult = results.find(r => r.frequency === selectedFrequency);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!selectedResult || !selectedResult.isAvailable) {
      alert("Por favor, selecciona una frecuencia de pago válida.");
      return;
    }

    setSubmissionStatus('loading');
    const leadData: LeadData = {
      ...values,
      plan: selectedPlan,
      frecuencia_pago: selectedResult.frequency,
      adults,
      menores_14: children,
      total_recibo: selectedResult.total,
    };

    try {
      await saveLead(leadData);
      setSubmissionStatus('success');
    } catch (error) {
      setSubmissionStatus('error');
    }
  };

  if (submissionStatus === 'success') {
    return (
        <DialogContent>
            <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-dkv-green-dark mb-4">¡Gracias!</h2>
                <p>Hemos recibido tus datos. Un asesor se pondrá en contacto contigo en breve.</p>
            </div>
        </DialogContent>
    )
  }

  return (
    <Dialog onOpenChange={() => {
        // Reset state on close
        form.reset();
        setSubmissionStatus('idle');
        setSelectedFrequency(null);
    }}>
      <DialogTrigger asChild>
        <Button variant="outline">Calcular Precio</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Calcula tu seguro dental</DialogTitle>
          <p className="text-sm text-gray-500">
            Añade a los asegurados y descubre el precio final de tu póliza.
          </p>
        </DialogHeader>
        <DialogClose asChild>
          <button
            className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </DialogClose>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-2 rounded-lg bg-gray-100 p-1">
              <button onClick={() => setSelectedPlan('Classic')} className={`px-4 py-2 text-sm font-semibold rounded-md ${selectedPlan === 'Classic' ? 'bg-white shadow' : ''}`}>
                Plan Classic
              </button>
              <button onClick={() => setSelectedPlan('Elite')} className={`px-4 py-2 text-sm font-semibold rounded-md ${selectedPlan === 'Elite' ? 'bg-white shadow' : ''}`}>
                Plan Élite
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between col-span-2 p-3 rounded-lg border">
            <div className="flex items-center gap-3">
              <User className="text-dkv-green-digital"/>
              <div>
                <p className="font-semibold">Adultos</p>
                <p className="text-xs text-gray-500">14 años o más</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleAdultsChange(-1)} aria-label="Disminuir adultos">-</Button>
              <span className="font-bold text-lg w-8 text-center">{adults}</span>
                    <Button variant="outline" size="icon" onClick={() => handleAdultsChange(1)} aria-label="Aumentar adultos">+</Button>
            </div>
          </div>

          <div className="flex items-center justify-between col-span-2 p-3 rounded-lg border">
            <div className="flex items-center gap-3">
              <Baby className="text-dkv-green-digital"/>
              <div>
                <p className="font-semibold">Niños</p>
                <p className="text-xs text-gray-500">Menores de 14 años (Gratis)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleChildrenChange(-1)} aria-label="Disminuir niños">-</Button>
              <span className="font-bold text-lg w-8 text-center">{children}</span>
                    <Button variant="outline" size="icon" onClick={() => handleChildrenChange(1)} aria-label="Aumentar niños">+</Button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Elige la frecuencia de pago</h3>
          <div className="space-y-2">
            {results.map(({ frequency, total, isAvailable }) => (
              <button
                key={frequency}
                onClick={() => isAvailable && setSelectedFrequency(frequency)}
                disabled={!isAvailable}
                className={`w-full flex justify-between items-center p-3 rounded-lg border text-left
                  ${!isAvailable ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-green-50'}
                  ${selectedFrequency === frequency ? 'border-dkv-green-digital border-2' : ''}`}
              >
                <span className="font-semibold">{frequency}</span>
                {isAvailable ? (
                  <span className="font-bold text-dkv-green-dark">{total.toFixed(2)}€</span>
                ) : (
                  <span className="text-sm font-semibold">No disponible</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {selectedFrequency && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <FormField control={form.control} name="nombre" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo</FormLabel>
                  <FormControl><Input placeholder="Tu nombre" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="telefono" render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl><Input placeholder="Tu teléfono" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (Opcional)</FormLabel>
                  <FormControl><Input placeholder="tu@email.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>

              <Button type="submit" disabled={submissionStatus === 'loading'} className="w-full">
                {submissionStatus === 'loading' ? 'Enviando...' : 'Solicitar información'}
              </Button>
              {submissionStatus === 'error' && <p className="text-red-500 text-sm text-center">No se pudo enviar el formulario. Inténtalo de nuevo.</p>}
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
