import csv
import heapq

class KDTree(object):
    
    def __init__(self, points, dim, dist_sq_func=None):


        def dist_sq_func(a,b):
            acc = 0
            for i,x in enumerate(a):
                acc += (x - b[0][i])**2 
            
            return acc 
        
        
        def make(points, i=0):
            if len(points) > 1:
                points.sort(key=lambda x: x[0][i])
                i = (i + 1) % dim
                m = len(points) // 2 
                return [make(points[:m], i), make(points[m + 1:], i), 
                    points[m]]
            if len(points) == 1:
                return [None, None, points[0]]
        
        def get_knn(node, point, k, heap, i=0, started=1):
            if node is not None:
                dist_sq = dist_sq_func(point, node[2])
                dx = node[2][0][i] - point[i]
                if len(heap) < k:
                    heapq.heappush(heap, (-dist_sq, started, node[2]))
                elif dist_sq < -heap[0][0]:
                    heapq.heappushpop(heap, (-dist_sq, started, node[2]))
                i = (i + 1) % dim
                for b in (dx < 0 , dx >= 0):
                    get_knn(node[b], point, k, 
                        heap, i, -1)
                    
                    if dx*dx >= -heap[0][0]:
                        break
                    
            if started == 1:
                return [(-h[0], h[2]) for h in sorted(heap)][::-1]



        self._get_knn = get_knn 
        self._root = make(points)


    def get_knn(self, point, k):
        return self._get_knn(self._root, point, k, [])





