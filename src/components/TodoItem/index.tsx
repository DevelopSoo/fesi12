// src/components/TodoItem/index.tsx
export default function TodoItem({
  task,
  completed,
}: {
  task: string;
  completed: boolean;
}) {
  return (
    // completed가 true면 completed라는 클래스를 추가한다.
    <li className={completed ? "completed" : ""}>
      {/* completed가 true면 check한다 */}
      {/* completed가 true면 disabled한다. */}
      <input type="checkbox" checked={completed} disabled={completed} />
      {/* 텍스트 */}
      <span>{task}</span>
      {/* completed가 true면 disabled한다 */}
      <button disabled={completed}>수정</button>
    </li>
  );
}
