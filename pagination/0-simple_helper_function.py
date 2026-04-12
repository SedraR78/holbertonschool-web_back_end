#!/usr/bin/env python3

"""This script defines the function index_range used for pagination."""


def index_range(page, page_size):

    """
    Calculate the start and end index for pagination.

    Return a tuple of two integers (start_index, end_index)
    """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)
