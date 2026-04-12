#!/usr/bin/env python3

import csv
import math
from typing import List


def index_range(page, page_size):
    """
    Calculate the start and end index for pagination.

    Return a tuple of two integers (start_index, end_index)
    """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)


class Server:
    """Server class to paginate a database of popular baby names."""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset."""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]
        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Return the appropriate page of the dataset."""
        # check types and values
        assert isinstance(page, int) and page > 0, \
            "must be a integer greater than 0"
        assert isinstance(page_size, int) and page_size > 0, \
            "must be a integer greater than 0"

        # Get dataset
        dataset = self.dataset()

        # Get range indexes
        start, end = index_range(page, page_size)

        # Return the slice (empty list if out of range)
        return dataset[start:end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> dict[str, any]:
        """Return a dictionary with pagination info and data."""
        data = self.get_page(page, page_size)
        total_items = len(self.dataset())
        total_pages = (total_items + page_size - 1) // page_size

        hyper = {
            'page_size': len(data),
            'page': page,
            'data': data,
            'next_page': page + 1 if page < total_pages else None,
            'prev_page': page - 1 if page > 1 else None,
            'total_pages': total_pages
        }
        return hyper
