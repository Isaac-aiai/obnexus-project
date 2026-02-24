# -*- coding: utf-8 -*-

if __name__ == "__main__":
    from obnexus.tests import run_cov_test

    run_cov_test(
        __file__,
        "obnexus",
        is_folder=True,
        preview=False,
    )