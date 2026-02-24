# -*- coding: utf-8 -*-

from obnexus.one.one_00_main import one


def test_one():
    _ = one


if __name__ == "__main__":
    from obnexus.tests import run_cov_test

    run_cov_test(
        __file__,
        "obnexus.one.one_00_main",
        preview=False,
    )
