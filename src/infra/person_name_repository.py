import csv
import os
from src.domain.entities import PersonName
from src.domain.interfaces import IPersonNameRepository

class PersonNameCsvRepository(IPersonNameRepository):
    EMAIL_LABEL = 'email'
    BADGE_NAME_LABEL = 'on_badge'
    PLATE_NAME_LABEL = 'on_plate'

    def __init__(self, src):
        super().__init__(src)

        if not os.path.exists(self.src):
            raise FileNotFoundError(f"Could not found: {self.src}")

        with open(self.src) as csv_file:
            self.name_table = list(csv.DictReader(csv_file))

    def person_names(self, emails: list[str]):
        names = [
            PersonName(
                row[self.BADGE_NAME_LABEL],
                row[self.PLATE_NAME_LABEL],
            ) for row in self.name_table if row[self.EMAIL_LABEL] in emails
        ]

        return names
