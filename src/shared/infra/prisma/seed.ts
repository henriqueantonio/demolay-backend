import { prisma } from "./connection";

(async () => {
  // Add Roles
  await prisma.role.createMany({
    data: [
      { name: "Conselheiro", slug: "counselor" },
      { name: "Oficial", slug: "official" },
      { name: "Tio", slug: "Uncle" },
    ],
  });

  // Add Office
  await prisma.office.createMany({
    data: [
      { name: "Mestre Conselheiro", slug: "master-counselor" },
      { name: "Primeiro Conselheiro", slug: "first-counselor" },
      { name: "Segundo Conselheiro", slug: "second-counselor" },
      { name: "Tesoureiro", slug: "treasurer" },
      { name: "Escrivão", slug: "registrar" },
      { name: "Primeiro Diácono ", slug: "first-deacon" },
      { name: "Segundo Diácono", slug: "second-deacon" },
      { name: "Primeiro Mordomo", slug: "first-butler" },
      { name: "Segundo Mordomo", slug: "second-butler" },
      { name: "Capelão", slug: "chaplain" },
      { name: "Hospitaleiro", slug: "hospitaller" },
      { name: "Mestre de Cerimônias", slug: "master-of-ceremonies" },
      { name: "Porta Estandarte", slug: "standart-bearer" },
      { name: "Orador", slug: "speaker" },
      { name: "Primeiro Preceptor", slug: "first-preceptor" },
      { name: "Segundo Preceptor ", slug: "second-preceptor" },
      { name: "Terceiro Preceptor", slug: "third-preceptor" },
      { name: "Quarto Preceptor", slug: "fourth-preceptor" },
      { name: "Quinto Preceptor", slug: "fifth-preceptor" },
      { name: "Sexto Preceptor", slug: "sixth-preceptor" },
      { name: "Sétimo Preceptor", slug: "seventh-preceptor" },
      { name: "Sentinela", slug: "sentinel" },
      { name: "Organista", slug: "organist" },
      { name: "Tio", slug: "Uncle" },
    ],
  });
})();
