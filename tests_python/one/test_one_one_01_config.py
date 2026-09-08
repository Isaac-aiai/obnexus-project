# -*- coding: utf-8 -*-

from obnexus.one.one_00_main import one


class TestConfigMixin:
    def test_config(self):
        _ = one.config


if __name__ == "__main__":
    from obnexus.tests import run_cov_test

    run_cov_test(
        __file__,
        "obnexus.one.one_01_config",
        preview=False,
    )
