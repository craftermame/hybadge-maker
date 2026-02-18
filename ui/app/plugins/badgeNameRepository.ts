import { CsvBadgeNameRepository } from "~/infrastructure/CsvBadgeNameRepository";

export default defineNuxtPlugin(() => {
  const csvBadgeNameRepository = new CsvBadgeNameRepository();

  return {
    provide: {
      csvBadgeNameRepository: csvBadgeNameRepository,
    },
  };
});
