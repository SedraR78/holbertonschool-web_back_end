#!/usr/bin/env python3
"""
Module 9-element_length
"""
from typing import Iterable, List, Tuple, Sequence


def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """
    Returns values with the appropriate types

    Args:
        lst (Iterable[Sequence]): An iterable of sequences.
    Returns:
        List[Tuple[Sequence, int]]: Values with the appropriate types.
    """
    return [(i, len(i)) for i in lst]