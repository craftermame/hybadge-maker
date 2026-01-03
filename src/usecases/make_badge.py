from src.domain.entities import PersonName
from src.domain.interfaces import IHyBadgeMaker, IPersonNameRepository

class MakeBadgeUseCase:
    def __init__(self, badge_maker: IHyBadgeMaker, repo: IPersonNameRepository):
        self.repo = repo
        self.badge_maker = badge_maker

    def execute(
            self,
            question: str,
            output_path: str,
        ) -> str:

        person_names = self.repo.person_names()

        badge_path = \
            self.badge_maker.make_badge(person_names, question, output_path)

        return badge_path
