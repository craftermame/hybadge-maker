from abc import ABC, abstractmethod
from src.domain.entities import PersonName

class IHyBadgeMaker(ABC):
    @abstractmethod
    def make_badge(
            self,
            person_names: list[PersonName],
            question: str,
            output_path: str,
        ) -> str:
        pass

class IPersonNameRepository(ABC):
    def __init__(self, src: str):
        self.src = src

    @abstractmethod
    def person_names(self, emails: list[str]) -> list[PersonName]:
        pass
