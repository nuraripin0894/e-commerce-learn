import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
} from "../redux/counter/counterSlice";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button, Card, CardBody, CardHeader, Slider } from "@nextui-org/react";
import { useState } from "react";

export default function CounterPage() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(0);

  return (
    <div className="flex items-center justify-center h-screen bg-background-gray">
      <Card className="w-96 shadow-lg">
        <CardHeader className="flex justify-center">
          <h2 className="text-2xl font-bold text-primary">Counter App</h2>
        </CardHeader>
        <CardBody className="flex flex-col items-center space-y-6">
          <h3 className="text-4xl font-bold text-primary-dark ">{count}</h3>
          <div className="flex space-x-4">
            <Button
              color="danger"
              variant="shadow"
              onPress={() => {
                dispatch(decrement());
              }}
              startContent={<MinusIcon className="h-6 w-6" />}
            >
              Decrease
            </Button>
            <Button
              color="success"
              variant="shadow"
              onPress={() => {
                dispatch(increment());
              }}
              startContent={<PlusIcon className="h-6 w-6" />}
            >
              Increase
            </Button>
          </div>
          <div className="w-full space-y-2">
            <Slider
              size="sm"
              step={1}
              color="primary"
              label="Increment Amount "
              showSteps={true}
              maxValue={10}
              minValue={1}
              className="max-w-md"
              onChange={setIncrementAmount}
            />
            <div className="flex justify-between">
              <span className="text-sm text-primary-dark">
                Amount: {incrementAmount}
              </span>
              <Button
                color="primary"
                variant="shadow"
                onPress={() => {
                  dispatch(incrementByAmount(Number(incrementAmount)));
                }}
                size="sm"
              >
                Add Amount
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
