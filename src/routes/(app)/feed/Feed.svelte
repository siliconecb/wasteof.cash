<script>
  import Compose from "$lib/components/app/Compose.svelte";
  import Post from "$lib/components/app/posts/Post.svelte";
</script>

<!-- main page content div -->
<main>
  <div class="container mx-auto mt-20 flex flex-col items-center">
    <div>
      <!-- create post component -->
      <Compose />

      <!-- actual feed stuff -->
      <div class="w-full mt-4 mx-auto flex justify-center">
        <!-- <Post username="supersecrettesting" time="1731593173636" content="\u003Cp\u003Etesting for unicode un-escape (this is normal text)\u003C/p\u003E\u003Ch2\u003Ethis is a header\u003C/h2\u003E\u003Cp\u003E\u003Cstrong\u003Ethis is some bold text\u003C/strong\u003E\u003C/p\u003E\u003Cp\u003E\u003Cem\u003Ethis is some italics text\u003C/em\u003E\u003C/p\u003E\u003Cp\u003E\u003Cu\u003Ethis is underlined text\u003C/u\u003E\u003C/p\u003E\u003Cp\u003E\u003Cs\u003Ethis is striked out text\u003C/s\u003E\u003C/p\u003E\u003Cp\u003E\u003Cmark\u003Ethis is highlighted text\u003C/mark\u003E\u003C/p\u003E\u003Cblockquote\u003E\u003Cp\u003Ethis is quoted text\u003C/p\u003E\u003C/blockquote\u003E\u003Cpre\u003E\u003Ccode\u003Ethis is some code text ig\u003C/code\u003E\u003C/pre\u003E\u003Cp\u003E\u003Ccode\u003Ethis is a code tag or something, idk the difference\u003C/code\u003E \u003C/p\u003E\u003Cul\u003E\u003Cli\u003E\u003Cp\u003Ethis\u003C/p\u003E\u003C/li\u003E\u003Cli\u003E\u003Cp\u003Eis\u003C/p\u003E\u003C/li\u003E\u003Cli\u003E\u003Cp\u003Ea\u003C/p\u003E\u003C/li\u003E\u003Cli\u003E\u003Cp\u003Ebulleted\u003C/p\u003E\u003C/li\u003E\u003Cli\u003E\u003Cp\u003Elist\u003C/p\u003E\u003C/li\u003E\u003C/ul\u003E\u003Col\u003E\u003Cli\u003E\u003Cp\u003Eand this\u003C/p\u003E\u003C/li\u003E\u003Cli\u003E\u003Cp\u003Eis\u003C/p\u003E\u003C/li\u003E\u003Cli\u003E\u003Cp\u003Ea\u003C/p\u003E\u003C/li\u003E\u003Cli\u003E\u003Cp\u003Enumbered\u003C/p\u003E\u003C/li\u003E\u003Cli\u003E\u003Cp\u003Elist\u003C/p\u003E\u003C/li\u003E\u003C/ol\u003E\u003Cp\u003E\u003C/p\u003E"/> -->
        <Post
          username="supersecrettesting"
          time="1731593173636"
          color="indigo"
          content="\u003Cp\u003Emultiline formatting test\u003C/p\u003E\u003Ch2\u003Efirst header\u003C/h2\u003E\u003Ch2\u003Esecond header\u003C/h2\u003E\u003Cp\u003E\u003Cmark\u003Ecolor\u003C/mark\u003E\u003C/p\u003E\u003Cp\u003E\u003Cmark\u003Errss\u003C/mark\u003E\u003C/p\u003E\u003Cblockquote\u003E\u003Cp\u003Ethis is\u003C/p\u003E\u003Cp\u003Ea quote\u003C/p\u003E\u003Cp\u003E-supersecrettesting\u003C/p\u003E\u003C/blockquote\u003E\u003Cpre\u003E\u003Ccode\u003Emultiline\ncodeblock\n\u003C/code\u003E\u003C/pre\u003E\u003Cp\u003E\u003Ccode\u003Emulti-line\u003C/code\u003E\u003C/p\u003E\u003Cp\u003E\u003Ccode\u003Einline code\u003C/code\u003E \u003C/p\u003E\u003Cp\u003E\u003C/p\u003E"
        />
      </div>
    </div>
  </div>
</main>
