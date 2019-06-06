# vue-slot

## 多个插槽
**父组件**
```vue
<div>我是插槽父组件</div>
<detalis-test>
  <div slot="girl">漂亮、美丽、购物、逛街</div>
  <div slot="boy">帅气、才实</div>
  <div>我是一类人，我是默认的插槽</div>
</detalis-test>
```
**子组件**
```vue
<div>
  <div>我是插槽子组件</div>
  <slot name="girl"></slot>
  <slot name="boy"></slot>
  <slot></slot>
</div>
```
## 作用域插槽
作用域插槽（将子组件的值传到父组件供使用）

**父组件**
```vue
<div>我是插槽父组件</div>
<detalis-test :items="items">
  <template slot-scope="props">
    <span>{{ props.addr }}</span>
    <span>{{ props.cname }}</span>
    <span>{{ props.age }}</span>
  </template>
</detalis-test>
```
```vue
<div>
  <div>我是插槽子组件{{items}}</div>
  <slot :cname="items[2].cname"></slot>
  <slot :addr="items[2].addr"></slot>
  <slot age="18"></slot>
</div>
```