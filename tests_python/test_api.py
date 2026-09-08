# -*- coding: utf-8 -*-

from obnexus import api


def test_api():
    _ = api.one


if __name__ == "__main__":
    from obnexus.tests import run_cov_test

    run_cov_test(
        __file__,
        "obnexus.api",
        preview=False,
    )
