#!/usr/bin/env python3
"""Helper pour la pagination."""
from typing import Tuple

def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Retourne (start, end) pour la pagination."""
    start = (page - 1) * page_size
    end = start + page_size
    return (start, end)