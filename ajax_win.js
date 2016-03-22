/**
 * Created by Tomas Hujer on 21.3.16.
 * thujer at gmail com
 */

/**
 * Ajax window
 * Create dynamic window and provide ajax request exchange
 * @param s_ajax_url Ajax destination url
 * @param s_tmp_source Template ID, class, or any other identifier
 * @param o_ajax_params Ajax params object forward
 * @param o_tmp_var Template params to replace
 */
function ajax_win(s_ajax_url, s_tmp_source, o_ajax_params, o_tmp_var) {

    $('*[data-action="ajax_win"][data-procedure]').each(function() {

        var e_elm = this;

        var html_tmp_default = '<div class="ajax_win" data-type="window">'
            +'<div class="close">Zavřít</div>'
            +'<div class="heading">{s_title}</div><hr />'
            +'<div class="ajax-loader" data-target="content">Zpracovávám...</div>'
            +'</div>';


        // Add property to ajax params
        o_ajax_params['s_proc_name'] = $(e_elm).attr('data-procedure') || '';
        o_ajax_params['__modal'] = 1;

        $(e_elm).css({
            cursor: 'pointer',
            textDecoration: 'underline'
        }).on('click', function() {

            var s_ajax_win = '.ajax_win';
            var html = $(s_tmp_source).html();
            if(!html) {
                html = html_tmp_default;
            }

            // Replace all template variables
            for(var s_prop in o_tmp_var) {

                if(!o_tmp_var.hasOwnProperty(s_prop))
                    continue;

                html = html.replace('{'+s_prop+'}', o_tmp_var[s_prop])
            }

            $(s_ajax_win).html(html);

            if($(s_ajax_win).is(':visible')) {
                $(s_ajax_win).remove();
            }

            $('body').append(html);

            $(s_ajax_win).css({
                left: $(e_elm).offset().left,
                top: $(e_elm).offset().top
            });

            $(s_ajax_win).find('.close').on('click', function() {
                $(this).closest('*[data-type="window"]').remove();
            });

            $.ajax({
                type: "GET",
                data: o_ajax_params,
                url: s_ajax_url,
                cache: false,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data) {
                    if(data.hasOwnProperty('s_content')) {
                        $(s_ajax_win).find('*[data-target="content"]').html(data.s_content);
                    } else {
                        console.log(data);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Ajax-win: there was an error', textStatus, errorThrown);
                }
            });
        });
    });
}
