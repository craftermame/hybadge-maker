from src.domain.interfaces import IHyBadgeMaker
from .hybadge_factory import HyBadgeFactory

class ReportLabBadgeMaker(IHyBadgeMaker):
    def make_badge(self, person_names, question, output_path):

        badge_path = \
            HyBadgeFactory(person_names, question, output_path).make()

        return badge_path
