# ajax_win
Simple automated javascript window with ajax data exchange

Parameters:
ajax_win(\<destination url\>, \<template jquery ID\>, \<object data to send\>, \<object template variables to replace\>)

Example call:

    /**
     * Add ajax window
     */
    ajax_win('/controller/action', '#tmp_ajax_win', {
        test: 1
    }, {
        s_title: 'Example message title'
    });
