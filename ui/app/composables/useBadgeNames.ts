import type { BadgeName } from "#shared/domain/BadgeName/BadgeName";

export const useBadgeNames = () => {
  const { $csvBadgeNameRepository } = useNuxtApp();
  const badgeNames = ref<BadgeName[]>([]);

  const loadBadgeNamesFromCsv = async (csvPath: string) => {
    try {
      const _badgeNames = await $csvBadgeNameRepository.findAll(csvPath);
      badgeNames.value = _badgeNames;
    } catch (error) {
      badgeNames.value = [];
      throw error;
    }
  };

  return { badgeNames: readonly(badgeNames), loadBadgeNamesFromCsv };
};
