<?php

namespace App\Organizer\Application\DTO\Request;

use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class LoginOrganizerRequest
{
    /**
     * @Assert\NotBlank(message="Email should not be blank.")
     * @Assert\Email(message="The email '{{ value }}' is not a valid email.")
     */
    private string $email;

    /**
     * @Assert\NotBlank(message="Password should not be blank.")
     * @Assert\Length(
     *      min = 6,
     *      minMessage = "Your password must be at least {{ limit }} characters long"
     * )
     */
    private string $password;

    public function __construct(string $email, string $password)
    {
        $this->email = $email;
        $this->password = $password;

        $this->validate();
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    private function validate(): void
    {
        $validator = Validation::createValidatorBuilder()->enableAnnotationMapping()->getValidator();
        $violations = $validator->validate($this);

        if (count($violations) > 0) {
            $errors = [];
            foreach ($violations as $violation) {
                $errors[] = $violation->getMessage();
            }
            throw new \InvalidArgumentException(implode(', ', $errors));
        }
    }
}