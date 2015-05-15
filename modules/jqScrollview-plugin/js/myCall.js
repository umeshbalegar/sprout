        $(function () {
            $('#photoGallery').jqxScrollView({ width: 600, height: 450, buttonsOffset: [0, 0]});
            $('#StartBtn').jqxButton({ theme: theme });
            $('#StopBtn').jqxButton({ theme: theme });
            $('#StartBtn').click(function () {
                $('#photoGallery').jqxScrollView({ slideShow: true });
            });
            $('#StopBtn').click(function () {
                $('#photoGallery').jqxScrollView({ slideShow: false });
            });
        });