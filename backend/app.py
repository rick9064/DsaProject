import os
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from algorithms.search import search  
from algorithms.sort import sort     
from algorithms.queue import Queue 
from algorithms.binarytree import BinaryTree
import logging

app = Flask(__name__)

CORS(app)

logging.basicConfig(level=logging.DEBUG)

queue_instance = Queue()

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/')
def home():
    return "Welcome to the DSA Algorithm Manager API"


# Search algorithm route
@app.route('/search', methods=['POST'])
def search_algorithm():
    try:
        data = request.json
        array = data.get('array', [])
        target = data.get('target')

        if not isinstance(array, list) or not all(isinstance(i, (int, float)) for i in array):
            return jsonify({"error": "Invalid input. 'array' must be a list of numbers."}), 400

        if not isinstance(target, (int, float)):
            return jsonify({"error": "Invalid input. 'target' must be a number."}), 400

        result = search(array, target)

        app.logger.debug(f"Search Input: array={array}, target={target}, result={result}")

        return jsonify({"found_at": result})
    except Exception as e:
        app.logger.error(f"Error in /search route: {e}")
        return jsonify({"error": "An error occurred while processing the search request."}), 500


# Sort algorithm route
@app.route('/sort', methods=['POST'])
def sort_algorithm():
    data = request.json
    array = data.get('array', [])
    
    if not array:
        return jsonify({"error": "Invalid input, array is required"}), 400
    
    result = sort(array)
    
    if isinstance(result, list):
        return jsonify({"sorted_array": result})
    else:
        return jsonify({"error": "Sorting failed, invalid result"}), 500



# Queue algorithm route
queue_instance = Queue()

@app.route('/queue', methods=['POST'])
def queue_algorithm():
    data = request.json
    operation = data.get('operation')
    value = data.get('value', None)

    if not operation:
        return jsonify({"error": "Invalid input, operation is required"}), 400

    if operation == 'enqueue' and value is not None:
        queue_instance.enqueue(value)
        return jsonify({"message": f"Enqueued {value}", "current_queue": queue_instance.queue})
    elif operation == 'dequeue':
        dequeued_value = queue_instance.dequeue()
        if dequeued_value is None:
            return jsonify({"message": "Queue is empty", "current_queue": queue_instance.queue})
        return jsonify({"message": f"Dequeued {dequeued_value}", "current_queue": queue_instance.queue})
    else:
        return jsonify({"error": "Invalid operation or missing value"}), 400




# Binary Tree Traversal Routes

@app.route('/create-tree', methods=['POST'])
def create_tree():
    data = request.json.get('values', [])
    tree = BinaryTree()
    for value in data:
        tree.insert(value)
    
    inorder_result = []
    tree.inorder(tree.root, inorder_result)

    preorder_result = []
    tree.preorder(tree.root, preorder_result)

    postorder_result = []
    tree.postorder(tree.root, postorder_result)

    return jsonify({
        "inorder": inorder_result,
        "preorder": preorder_result,
        "postorder": postorder_result
    })






if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
