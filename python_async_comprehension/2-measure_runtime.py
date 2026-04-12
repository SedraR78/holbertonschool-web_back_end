#!/usr/bin/env python3
"""Module for measuring parallel async comprehension runtime"""
import asyncio
import time
async_comprehension = __import__('1-async_comprehension').async_comprehension


async def measure_runtime() -> float:
    """Runs async_comprehension 4 times in parallel and returns total runtime"""
    start = time.time()
    await asyncio.gather(*[async_comprehension() for _ in range(4)])
    return time.time() - start