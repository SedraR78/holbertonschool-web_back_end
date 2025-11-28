#!/usr/bin/env python3
"""
Module 7-to_kv
"""
from typing import Union, Tuple


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """
    Returns a formatted tuple

    Args:
        k (string):  A sequence of characters.
        v (Union[int, float]): The value as an integer or float.

    Returns:
        tuple: A tuple where the first element is k
        and the second element is the square of v
    """
    return (k, v**2)