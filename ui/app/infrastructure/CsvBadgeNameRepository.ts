import type { BadgeName } from "#shared/domain/BadgeName/BadgeName";
import type { IBadgeNameRepository } from "#shared/domain/BadgeName/IBadgeNameRepository";

export class CsvBadgeNameRepository implements IBadgeNameRepository {
  async findAll(sourceId: string): Promise<BadgeName[]> {
    const csvContent: string = await window.mainAPI.readCsvFile(sourceId);

    return csvContent.split('\n').filter(line => line.trim() !== "").slice(1).map(line => {
      const [email, on_badge, on_plate] = line.split(',');
      return {
        email: email || '',
        onBadge: on_badge || '',
        onPlate: on_plate || ''
      };
    });
  }
}
