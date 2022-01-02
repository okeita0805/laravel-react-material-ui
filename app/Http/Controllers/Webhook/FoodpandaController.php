<?php

namespace App\Http\Controllers\Webhook;

use App\Dto\Webhook\FoodpandaInput;
use App\Http\Controllers\Controller;
use App\Manager\Webhook\FoodpandaManager;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FoodpandaController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     * @throws Exception
     */
    public function __invoke(Request $request, FoodpandaManager $manager): JsonResponse
    {
        $input = new FoodpandaInput($request->all());
        $manager->saveOrder($input);

        return response()->json([], 200);
    }
}
