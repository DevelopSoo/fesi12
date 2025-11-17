function solution(priorities: number[], location: number) {
  // 1. 큐에 우선순위와 타겟 여부를 담은 객체를 넣는다.
  const queue = priorities.map((priority, index) => ({
    priority,
    isTarget: index === location,
  }));
  /**
	 priorities:[2, 1, 3, 2], location: 2라면?
	  	{
				queue: [
					{ priority: 2, isTarget: false },
					{ priority: 1, isTarget: false },
					{ priority: 3, isTarget: true },
					{ priority: 2, isTarget: false }
				]
			}
	 */
  console.log(queue);
}

console.log(solution([2, 1, 3, 2], 2));
