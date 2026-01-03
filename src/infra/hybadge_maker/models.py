from dataclasses import dataclass

@dataclass
class Pointer:
    x: float
    y: float

class Frame:
    def __init__(self, width: float, height: float):
        self._width = width
        self._height = height

    def w(self, ratio: float = 1.0) -> float:
        return self._width * ratio

    def h(self, ratio: float = 1.0) -> float:
        return self._height * ratio
