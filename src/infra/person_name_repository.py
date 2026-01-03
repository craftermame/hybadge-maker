import csv
import os
from src.domain.entities import PersonName
from src.domain.interfaces import IPersonNameRepository

class PersonNameCsvRepository(IPersonNameRepository):
    BADGE_NAME_LABEL = 'on_badge'
    PLATE_NAME_LABEL = 'on_plate'

    def __init__(self, src):
        super().__init__(src)

        if not os.path.exists(self.src):
            raise FileNotFoundError(f"Could not found: {self.src}")

        with open(self.src) as csv_file:
            self.name_table = list(csv.DictReader(csv_file))

    def person_names(self):
        names = [
            PersonName(
                row[self.BADGE_NAME_LABEL],
                row[self.PLATE_NAME_LABEL],
            ) for row in self.name_table
        ]

        return names
