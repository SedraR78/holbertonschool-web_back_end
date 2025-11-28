#!/usr/bin/env python3
"""
Module 8-make_multiplier
"""
from typing import Callable


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """
    Returns a function that multiplies a float by multiplier

    Args:
        multiplier (float): Value to multiply

    Returns:
        Callable[[float], float]: Another multiplier function.
    """
    def multiplier_value(value: float) -> float:
        return value * multiplier
    return multiplier_value