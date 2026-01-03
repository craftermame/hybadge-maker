import sys
from src.infra.hybadge_maker import ReportLabBadgeMaker
from src.infra.person_name_repository import PersonNameCsvRepository
from src.usecases.make_badge import MakeBadgeUseCase

def main():
    if len(sys.argv) < 4:
        raise ValueError('Arguments: <question> <repo-path> <output-path>')
    question = sys.argv[1]
    repo_path = sys.argv[2]
    output_path = sys.argv[3]

    maker = ReportLabBadgeMaker()  # infra
    repo = PersonNameCsvRepository(repo_path)
    usecase = MakeBadgeUseCase(maker, repo)  # usecase

    try:
        badge_path = usecase.execute(question, output_path)
        print(badge_path)
    except Exception as e:
        print(f"Error occured: {e}")

if __name__ == '__main__':
    main()
