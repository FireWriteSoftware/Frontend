<template>
  <div>
    <div class="flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">CKEditor</h2>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <!-- BEGIN: Standard Editor -->
      <div class="col-span-12 lg:col-span-6">
        <div class="box">
          <div id="standard-editor" class="p-5">
            <div class="preview">
              <CKEditor
                v-model="editorData"
                :editor="classicEditor"
                :config="editorConfig"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- END: Standard Editor -->
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials'
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold'
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic'
import UnderlinePlugin from '@ckeditor/ckeditor5-basic-styles/src/underline'
import StrikethroughPlugin from '@ckeditor/ckeditor5-basic-styles/src/strikethrough'
import CodePlugin from '@ckeditor/ckeditor5-basic-styles/src/code'
import SubscriptPlugin from '@ckeditor/ckeditor5-basic-styles/src/subscript'
import SuperscriptPlugin from '@ckeditor/ckeditor5-basic-styles/src/superscript'
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link'
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter'
import EasyImagePlugin from '@ckeditor/ckeditor5-easy-image/src/easyimage'
import ImagePlugin from '@ckeditor/ckeditor5-image/src/image'
import ImageUploadPlugin from '@ckeditor/ckeditor5-image/src/imageupload'
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert'
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption'
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
import ImageAlternateText from '@ckeditor/ckeditor5-image/src/imagetextalternative'
import ImageCrop from '@ckeditor/ckeditor5-image/src/imageresize'
import CloudServicesPlugin from '@ckeditor/ckeditor5-cloud-services/src/cloudservices'
import Font from '@ckeditor/ckeditor5-font/src/font'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import HeadingButtonsUI from '@ckeditor/ckeditor5-heading/src/headingbuttonsui'
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight'

export default defineComponent({
  setup() {
    const date = ref('')
    const classicEditor = ClassicEditor

    const editorConfig = {
      plugins: [
        Font,
        EssentialsPlugin,
        BoldPlugin,
        UnderlinePlugin,
        StrikethroughPlugin,
        ItalicPlugin,
        LinkPlugin,
        ParagraphPlugin,
        CodePlugin,
        SubscriptPlugin,
        SuperscriptPlugin,
        SimpleUploadAdapter,
        EasyImagePlugin,
        ImagePlugin,
        ImageUploadPlugin,
        ImageInsert,
        ImageToolbar,
        ImageCaption,
        ImageStyle,
        ImageAlternateText,
        ImageCrop,
        CloudServicesPlugin,
        Heading,
        HeadingButtonsUI,
        Highlight
      ],
      toolbar: {
        items: [
          'fontSize',
          'fontFamily',
          'fontColor',
          'fontBackgroundColor',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'code',
          'subscript',
          'superscript',
          'link',
          'undo',
          'redo',
          '|',
          'insertImage',
          'imageStyle:full',
          'imageStyle:side',
          '|',
          'highlight'
        ]
      },
      simpleUpload: {
        uploadUrl: 'storage/uploadEditor',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
    }
    const editorData = ref('<p>Content of the editor.</p>')

    return {
      date,
      classicEditor,
      editorConfig,
      editorData
    }
  }
})
</script>
