import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';

export const server = {
  sendContact: defineAction({
    accept: 'form',
    input: z.object({
      nombre: z.string().min(2),
      email: z.string().email(),
      mensaje: z.string().min(10),
    }),
    handler: async ({ nombre, email, mensaje }) => {
      // Cargamos la llave JUSTO AQUÍ, no antes.
      const apiKey = process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
      
      if (!apiKey) {
        throw new Error("Llave no encontrada en el sistema.");
      }

      const resend = new Resend(apiKey);

      const { error } = await resend.emails.send({
        from: 'Portfolio <onboarding@resend.dev>',
        to: 'osvaldo.hernandez1311@gmail.com',
        subject: `Mensaje de ${nombre}`,
        text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`,
      });

      if (error) throw new Error(error.message);
      return { success: true };
    },
  }),
};