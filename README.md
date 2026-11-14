# TanStack Query Todo List

## 1. Todo 삭제 기능

`useMutation`을 사용하여 Todo 삭제 API를 호출하고, 삭제 성공 시 `setQueryData`로 캐시에서 해당 Todo를 제거하도록 구현하였다.

`invalidateQueries`를 사용하지 않고 캐시를 직접 수정하여 전체 목록을 다시 조회하지 않아도 삭제 결과가 화면에 반영되도록 하였다.

**주요 구현 코드 (`TodoList.tsx`)**

```tsx
const { mutate: deleteTodoMutate } = useMutation({
  mutationFn: deleteTodo,
  onSuccess: async (deletedId) => {
    await queryClient.cancelQueries({ queryKey: ["todos"] });

    queryClient.setQueryData<Todo[]>(["todos"], (prevTodos) => {
      return prevTodos?.filter((todo) => todo.id !== deletedId);
    });
  },
});
```

## 2. 추가 학습 기능: Query Polling

**선택한 기능:** `refetchInterval`

Query Polling은 일정한 시간 간격으로 서버 데이터를 자동으로 다시 조회하는 기능이다.

`useQuery`에 `refetchInterval: 10000`을 설정하여 10초마다 Todo 목록을 자동으로 갱신하도록 구현하였다.

**주요 구현 코드 (`useTodosData.ts`)**

```tsx
export const useTodosData = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 5000,
    refetchInterval: 10000,
  });
};
```

## 3. 실행 화면

### Todo 삭제 기능

삭제 버튼 클릭 시 해당 Todo가 목록에서 제거된다.

<img width="615" height="470" alt="image" src="https://github.com/user-attachments/assets/20d95dc1-1cd8-4a7c-b172-ffd757c2ca48" />
<img width="600" height="405" alt="image" src="https://github.com/user-attachments/assets/f0764e64-e886-48dc-bf44-32f8ad953d0f" />


### Query Polling

Chrome 개발자 도구의 Network 탭에서 약 10초 간격으로 GET 요청이 반복되는 것을 확인하였다.

<img width="841" height="589" alt="image" src="https://github.com/user-attachments/assets/c65170ab-37a6-4b53-99bd-c011d37d1632" />

