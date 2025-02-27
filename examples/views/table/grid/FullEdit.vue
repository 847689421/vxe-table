<template>
  <div>
    <p class="tip">
      查询代理、服务端排序代理、服务端筛选代理、分页代理、增删改查<br>
      对于分页场景下，如果想要保留选中状态，可以通过设置 <table-api-link prop="checkbox-config"/> 的 <table-api-link prop="reserve"/> 属性<br>
      还可以通过 <toolbar-api-link prop="checkMethod"/> 设置个性化列禁止勾选<br>
      由 <grid-api-link name="vxe-grid"/> 代理数据转换，只需要配置好数据源即可；非常简单就可以渲染一个表格，从重复写冗余的代码中解放出来
    </p>

    <vxe-grid
      border
      resizable
      highlight-hover-row
      ref="xGrid"
      height="530"
      row-id="id"
      :filter-config="{remote: true}"
      :pager-config="{pageSize: 15}"
      :toolbar="tableToolbar"
      :proxy-config="tableProxy"
      :columns="tableColumn"
      :checkbox-config="{reserve: true, highlight: true}"
      :edit-rules="validRules"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      validRules: {
        name: [
          { required: true, message: '名称必须填写' },
          { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
        ],
        role: [
          { required: true, message: '角色必须填写' }
        ]
      },
      tableProxy: {
        index: true, // 启用动态序号代理
        sort: true, // 启用排序代理
        filter: true, // 启用筛选代理
        ajax: {
          // 任何支持 Promise API 的库都可以对接（fetch、jquery、axios、xe-ajax）
          query: ({ page, sort, filters }) => {
            // 处理排序条件
            let formData = {
              sort: sort.property,
              order: sort.order
            }
            // 处理筛选条件
            filters.forEach(({ column, property, values }) => {
              formData[property] = values.join(',')
            })
            return this.$ajax.get(`/api/user/page/list/${page.pageSize}/${page.currentPage}`, formData)
          },
          delete: ({ body }) => this.$ajax.post('/api/user/save', body),
          save: ({ body }) => this.$ajax.post('/api/user/save', body)
        }
      },
      tableToolbar: {
        id: 'full_edit_1',
        buttons: [
          { code: 'reload', name: 'app.body.button.refresh', icon: 'fa fa-refresh', disabled: false },
          { code: 'insert_actived', name: '新增', icon: 'fa fa-plus', disabled: false },
          {
            code: 'mark_cancel',
            name: 'app.body.button.markCancel',
            icon: 'fa fa-bookmark-o',
            disabled: false,
            dropdowns: [
              { code: 'delete_selection', icon: 'fa fa-trash-o', name: 'app.body.button.deleteSelectedRecords', disabled: false },
              { code: 'remove_selection', icon: 'fa fa-remove', name: '移除数据', disabled: false }
            ]
          },
          { code: 'save', name: 'app.body.button.save', icon: 'fa fa-save', disabled: false },
          {
            name: '导入/导出1',
            dropdowns: [
              { code: 'import', name: '直接导入', icon: 'fa fa-cloud-upload', disabled: false },
              { code: 'export', name: '直接导出 CSV', icon: 'fa fa-download', params: { type: 'csv' }, disabled: false },
              { code: 'export', name: '直接导出 XML', icon: 'fa fa-download', params: { type: 'xml' }, disabled: false },
              { code: 'export', name: '直接导出 HTML', icon: 'fa fa-download', params: { type: 'html' }, disabled: false },
              { code: 'export', name: '直接导出 TXT', icon: 'fa fa-download', params: { type: 'txt' }, disabled: false }
            ]
          },
          {
            name: '导入/导出2',
            icon: 'fa fa-cloud-download',
            dropdowns: [
              { code: 'open_import', name: '高级导入', icon: 'fa fa-cloud-upload', disabled: false },
              { code: 'open_export', name: '高级导出', icon: 'fa fa-download', disabled: false }
            ]
          },
          {
            name: '禁用按钮',
            disabled: false,
            dropdowns: [
              {
                code: 'other1',
                name: '下拉的按钮1',
                disabled: false
              },
              {
                code: 'other2',
                name: '下拉的按钮2',
                disabled: true
              },
              {
                code: 'other3',
                name: '下拉的按钮3',
                disabled: false
              }
            ]
          },
          {
            name: '更多操作',
            disabled: false,
            dropdowns: [
              { code: 'reset_custom', name: '重置个性化信息', disabled: false }
            ]
          }
        ],
        refresh: true,
        import: true,
        export: true,
        zoom: true,
        resizable: {
          storage: true
        },
        custom: {
          storage: true,
          checkMethod: this.checkColumnMethod
        }
      },
      tableColumn: [
        { type: 'checkbox', width: 50 },
        { type: 'seq', title: '序号', width: 80 },
        { field: 'name', title: 'Name', remoteSort: true, editRender: { name: 'input' } },
        { field: 'nickname', title: 'Nickname', editRender: { name: 'input' } },
        { field: 'sex', title: 'Sex', editRender: { name: 'select', options: [] } },
        {
          field: 'role',
          title: 'Role',
          remoteSort: true,
          width: 200,
          filters: [
            { label: '前端', value: '前端' },
            { label: '后端', value: '后端' },
            { label: '测试', value: '测试' }
          ],
          filterMultiple: false,
          editRender: { name: 'input' }
        },
        { field: 'describe', title: 'Describe', showOverflow: true, editRender: { name: 'input' } }
      ],
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          highlight-hover-row
          ref="xGrid"
          height="530"
          row-id="id"
          :filter-config="{remote: true}"
          :pager-config="{pageSize: 15}"
          :toolbar="tableToolbar"
          :proxy-config="tableProxy"
          :columns="tableColumn"
          :checkbox-config="{reserve: true, highlight: true}"
          :edit-rules="validRules"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              validRules: {
                name: [
                  { required: true, message: '名称必须填写' },
                  { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
                ],
                role: [
                  { required: true, message: '角色必须填写' }
                ]
              },
              tableProxy: {
                index: true, // 启用动态序号代理
                sort: true, // 启用排序代理
                filter: true, // 启用筛选代理
                ajax: {
                  // 任何支持 Promise API 的库都可以对接（fetch、jquery、axios、xe-ajax）
                  query: ({ page, sort, filters }) => {
                    // 处理排序条件
                    let formData = {
                      sort: sort.property,
                      order: sort.order
                    }
                    // 处理筛选条件
                    filters.forEach(({ column, property, values }) => {
                      formData[property] = values.join(',')
                    })
                    return this.$ajax.get(\`/api/user/page/list/\${page.pageSize}/\${page.currentPage}\`, formData)
                  },
                  delete: ({ body }) => this.$ajax.post('/api/user/save', body),
                  save: ({ body }) => this.$ajax.post('/api/user/save', body)
                }
              },
              tableToolbar: {
                id: 'full_edit_1',
                buttons: [
                  { code: 'reload', name: 'app.body.button.refresh', icon: 'fa fa-refresh', disabled: false },
                  { code: 'insert_actived', name: '新增', icon: 'fa fa-plus', disabled: false },
                  {
                    code: 'mark_cancel',
                    name: 'app.body.button.markCancel',
                    icon: 'fa fa-bookmark-o',
                    disabled: false,
                    dropdowns: [
                      { code: 'delete_selection', icon: 'fa fa-trash-o', name: 'app.body.button.deleteSelectedRecords', disabled: false },
                      { code: 'remove_selection', icon: 'fa fa-remove', name: '移除数据', disabled: false }
                    ]
                  },
                  { code: 'save', name: 'app.body.button.save', icon: 'fa fa-save', disabled: false },
                  {
                    name: '导入/导出1',
                    dropdowns: [
                      { code: 'import', name: '直接导入', icon: 'fa fa-cloud-upload', disabled: false },
                      { code: 'export', name: '直接导出 CSV', icon: 'fa fa-download', params: { type: 'csv' }, disabled: false },
                      { code: 'export', name: '直接导出 XML', icon: 'fa fa-download', params: { type: 'xml' }, disabled: false },
                      { code: 'export', name: '直接导出 HTML', icon: 'fa fa-download', params: { type: 'html' }, disabled: false },
                      { code: 'export', name: '直接导出 TXT', icon: 'fa fa-download', params: { type: 'txt' }, disabled: false }
                    ]
                  },
                  {
                    name: '导入/导出2',
                    icon: 'fa fa-cloud-download',
                    dropdowns: [
                      { code: 'open_import', name: '高级导入', icon: 'fa fa-cloud-upload', disabled: false },
                      { code: 'open_export', name: '高级导出', icon: 'fa fa-download', disabled: false }
                    ]
                  },
                  {
                    name: '禁用按钮',
                    disabled: false,
                    dropdowns: [
                      {
                        code: 'other1',
                        name: '下拉的按钮1',
                        disabled: false
                      },
                      {
                        code: 'other2',
                        name: '下拉的按钮2',
                        disabled: true
                      },
                      {
                        code: 'other3',
                        name: '下拉的按钮3',
                        disabled: false
                      }
                    ]
                  },
                  {
                    name: '更多操作',
                    disabled: false,
                    dropdowns: [
                      { code: 'reset_custom', name: '重置个性化信息', disabled: false }
                    ]
                  }
                ],
                refresh: true,
                import: true,
                export: true,
                zoom: true,
                resizable: {
                  storage: true
                },
                custom: {
                  storage: true,
                  checkMethod: this.checkColumnMethod
                }
              },
              tableColumn: [
                { type: 'checkbox', width: 50 },
                { type: 'seq', title: '序号', width: 80 },
                { field: 'name', title: 'Name', remoteSort: true, editRender: { name: 'input' } },
                { field: 'nickname', title: 'Nickname', editRender: { name: 'input' } },
                { field: 'sex', title: 'Sex', editRender: { name: 'select', options: [] } },
                {
                  field: 'role',
                  title: 'Role',
                  remoteSort: true,
                  width: 200,
                  filters: [
                    { label: '前端', value: '前端' },
                    { label: '后端', value: '后端' },
                    { label: '测试', value: '测试' }
                  ],
                  filterMultiple: false,
                  editRender: { name: 'input' }
                },
                { field: 'describe', title: 'Describe', showOverflow: true, editRender: { name: 'input' } }
              ]
            }
          },
          created () {
            this.findSexList()
          },
          methods: {
            async findSexList () {
              const sexList = await this.$ajax.get('/api/conf/sex/list')
              // 异步更新下拉选项
              let column = this.$refs.xGrid.getColumnByField('sex')
              column.editRender.options = sexList
            },
            checkColumnMethod ({ column }) {
              if (['nickname', 'role'].includes(column.property)) {
                return false
              }
              return true
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.findSexList()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    async findSexList () {
      const sexList = await this.$ajax.get('/api/conf/sex/list')
      // 异步更新下拉选项
      let column = this.$refs.xGrid.getColumnByField('sex')
      column.editRender.options = sexList
    },
    checkColumnMethod ({ column }) {
      if (['nickname', 'role'].includes(column.property)) {
        return false
      }
      return true
    }
  }
}
</script>
