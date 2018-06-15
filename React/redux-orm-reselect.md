# 理解redux orm中的reselect  
> 在orm中选择器的主要作用：  
- 选择器能够计算衍生数据，允许Redux向store中获取最小的可能的state
- 选择器是便捷高效的，一个选择器只会在传递的参数发生变化时才会重新计算
- 选择器是可以组合的，一个选择器可被嵌套在另一个选择器中  
```
export const ormSelector = state => state.orm;

export const company = createSelector(
  ormSelector,
  state => state.base.login.admin,
  orm.createSelector((orm, admin) => {
    debugger
    return orm.Company.filter({ admin: admin.id }).toRefArray()[0] || {};
  })
);

```  
### API 
**`createSelector(...inputSelectors | [inputSelectors], resultFunc):`**  
- 可接收一个或多个选择器，或者将选择器作为数组传递进来，计算其值并且通过它们的值作为参数传递给`resultFunc`  
- `createSelector` 确定`input-select`的值在引用恒等式（===）的调用之间是否发生了更改。使用`createSelector`创建的选择器输入应该是不可变的 
- 使用 `createSelector` 创建的选择器的缓存大小为1。这意味着在输入选择器的值更改时, 它们总是重新计算, 因为选择器只存储每个输入选择器的前一个值。
- 从选择器中访问组件的`props` 可能很有用。当选择器连接到具有连接的组件时, 组件的`props`将作为第二个参数传递给选择器