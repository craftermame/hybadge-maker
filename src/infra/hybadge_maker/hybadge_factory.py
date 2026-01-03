import os
from reportlab.pdfgen.canvas import Canvas
from reportlab.lib.pagesizes import A4, landscape
from src.domain.entities import PersonName
from .models import Frame, Pointer

class HyBadgeFactory:
    def __init__(
            self,
            person_names: list[PersonName],
            question: str,
            output_path: str,
        ) -> None:
        self._badge_names = [name.on_badge for name in person_names]
        self._plate_names = sorted([name.on_plate for name in person_names] * 2)
        self._question = question
        self._output_path = output_path
        self._page = Frame(*A4)
        self._canvas = \
            Canvas(self._output_path, (self._page.w(), self._page.h()))

    def make(self) -> str:
        os.makedirs(os.path.dirname(self._output_path), exist_ok=True)

        self._draw_badge_sheets()
        self._draw_plate_tag_sheets()
        self._canvas.save()

        return str(os.path.abspath(self._output_path))

    def _set_page_size(self, size: tuple[float, float]):
        self._page = Frame(*size)
        self._canvas.setPageSize((self._page.w(), self._page.h()))

    def _draw_badge_sheets(self) -> None:
        self._set_page_size(A4)

        while self._badge_names:
            badge_frame = Frame(self._page.w(1/2), self._page.h(1/4))
            frame_pointers = [
                Pointer(
                    x * badge_frame.w(),
                    y * badge_frame.h(),
                ) for x in [0, 1] for y in [0, 1, 2, 3]
            ]

            for p in frame_pointers:
                name = self._badge_names.pop() if self._badge_names else ''

                self._canvas.rect(p.x, p.y, badge_frame.w(), badge_frame.h())
                self._canvas.line(
                    10.0 + p.x,                    10.0 + p.y,
                    -10.0 + p.x + badge_frame.w(), 10.0 + p.y,
                )
                self._canvas.drawString(10.0 + p.x, 50.0 + p.y, name)
                self._canvas.drawString(10.0 + p.x, 30.0 + p.y, self._question)

            self._canvas.showPage()

    def _draw_plate_tag_sheets(self) -> None:
        self._set_page_size(landscape(A4))

        while self._plate_names:
            tag_frame = Frame(self._page.w(1/4), self._page.h(1/8))
            frame_pointers = [
                Pointer(
                    x * tag_frame.w(),
                    y * tag_frame.h(),
                ) for x in range(4) for y in range(8)
            ]

            for p in frame_pointers:
                name = self._plate_names.pop() if self._plate_names else ''

                self._canvas.rect(p.x, p.y, tag_frame.w(), tag_frame.h())
                self._canvas.drawString(10.0 + p.x, 50.0 + p.y, name)

            self._canvas.showPage()
