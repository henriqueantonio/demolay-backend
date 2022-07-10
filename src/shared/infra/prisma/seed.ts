import { prisma } from "./connection";

(async () => {
  // Add Roles
  await prisma.role.createMany({
    data: [
      { name: "Mestre Conselheiro", slug: "mestre-conselheiro" },
      { name: "Primeiro Conselheiro", slug: "primeiro-conselheiro" },
      { name: "Segundo Conselheiro", slug: "segundo-conselheiro" },
      { name: "Orador", slug: "orador" },
    ],
  });
})();
