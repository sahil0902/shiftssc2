namespace App\Notifications;

use App\Models\Shift;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ShiftApplicationNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $shift;
    public $status;

    public function __construct(Shift $shift, $status)
    {
        $this->shift = $shift;
        $this->status = $status;
    }

    public function via($notifiable): array
    {
        return ['mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        $status = ucfirst($this->status);
        $message = $this->status === 'approved' 
            ? "Congratulations! Your application has been approved."
            : "Unfortunately, your application has been rejected.";

        return (new MailMessage)
            ->subject("Shift Application {$status}")
            ->greeting("Hello {$notifiable->name}!")
            ->line("Your application for the shift '{$this->shift->title}' has been processed.")
            ->line($message)
            ->line("Shift Details:")
            ->line("Start: " . $this->shift->start_time->format('Y-m-d H:i'))
            ->line("End: " . $this->shift->end_time->format('Y-m-d H:i'))
            ->line("Department: " . $this->shift->department->name)
            ->action('View Shift', url("/shifts/{$this->shift->id}"))
            ->line('Thank you for using our application!');
    }
} 